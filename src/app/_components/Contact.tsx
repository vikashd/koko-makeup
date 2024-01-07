"use client";

import cx from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GoogleCaptchaWrapper } from "@/app/_components/recaptcha/GoogleCaptchaWrapper";
import { Spinner } from "@/app/_components/Loading";
import {
  Notifications,
  type Notification,
} from "@/app/_components/Notifications";
import {
  submitContactForm,
  type EmailFormErrors,
  type SubmitResponse,
} from "@/app/_utils/actions/submitContactForm";
import { EmailForm, schema } from "@/app/_utils/sendEmail";

const initialState: SubmitResponse = {
  type: "valid",
};

function withErrors({ errors }: { errors?: EmailFormErrors }) {
  return function FieldError({
    id,
  }: {
    id: keyof Omit<EmailFormErrors, "_errors">;
  }) {
    if (!errors?.[id]) {
      return null;
    }

    const { _errors } = errors[id]!;

    return (
      <div>
        {_errors.map((error, i) => (
          <p key={i} className="px-4 pt-2 text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>
    );
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={cx(
        "flex items-center justify-center p-4 mb-3 bg-blue-900 hover:bg-blue-800 rounded-md",
        {
          "bg-blue-900/40": pending,
          "pointer-events-none": pending,
        }
      )}
      type="submit"
      aria-disabled={pending}
    >
      {pending && <Spinner className="mr-2" />}
      <span className={cx({ "opacity-40": pending })}>Submit</span>
    </button>
  );
}

export function Contact() {
  return (
    <GoogleCaptchaWrapper>
      <ContactForm />
    </GoogleCaptchaWrapper>
  );
}

export function ContactForm() {
  const [state, submitFormAction] = useFormState(
    submitContactForm,
    initialState
  );
  const [dirty, setDirty] = useState<{ [key in keyof EmailForm]?: boolean }>(
    {}
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const FieldError = useMemo(() => {
    if (state.type === "invalid") {
      return withErrors({ errors: state.validated });
    }

    return null;
  }, [state]);

  const onInputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      const result = schema
        .pick({ [name]: true })
        .safeParse({ [name]: e.target.value });

      setDirty({ ...dirty, [name]: result.success });
    },
    [dirty]
  );

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter(({ id }) => id !== notificationId));
  }, []);

  const showNotification = useCallback(
    (notification: Notification) => {
      setNotifications((prev) => {
        notification.id = Date.now().toString();

        setTimeout(
          () => notification && removeNotification(notification.id),
          3000
        );

        return prev.concat(notification);
      });
    },
    [setNotifications, removeNotification]
  );

  const formAction = useCallback(
    async (formData: FormData) => {
      if (executeRecaptcha) {
        let token;

        try {
          token = await executeRecaptcha("contact");

          formData.set("recaptcha-token", token);

          submitFormAction(formData);
        } catch (e) {
          showNotification({
            id: Date.now().toString(),
            type: "error",
            message: "There was an error trying to send your message.",
          });
        }
      }
    },
    [executeRecaptcha, submitFormAction, showNotification]
  );

  useEffect(() => {
    let notification: Notification | undefined;

    switch (state.type) {
      case "invalid":
        notification = {
          id: "",
          type: "error",
          message: "There was an error trying to send your message.",
        };

        break;

      case "submitted":
        notification = {
          id: "",
          type: "success",
          message: "Your message was successfully sent!",
        };

        break;
    }

    if (notification !== undefined) {
      notification.id = Date.now().toString();

      showNotification(notification);
    }
  }, [state.type, showNotification]);

  return (
    <>
      <div className="max-w-screen-md">
        {state.type === "submitted" && (
          <div className="max-w-screen-md">
            <p>Thanks for your message! I&lsquo;ll be in touch soon.</p>
          </div>
        )}
        {state.type !== "submitted" && (
          <>
            <p className="mb-4">
              For general enquiries please feel free to contact me and
              I&lsquo;ll aim to get back to you within 24&nbsp;hours.
            </p>
            <p className="mb-4">
              Alternatively you can call me on{" "}
              <Link
                href="tel:+447903444712"
                className="underline hover:underline-offset-2"
              >
                +44 7903 444712
              </Link>
              .
            </p>
            <form
              className="flex flex-col mt-10 mb-24"
              action={formAction}
              noValidate
            >
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <div className="mb-4">
                  <label className="block text-lg ml-4 pb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={cx(
                      "px-4 py-4 w-full rounded-md border border-solid border-blue-500 bg-transparent",
                      {
                        "border-red-500":
                          state.type === "invalid" &&
                          state.validated.name &&
                          !dirty.name,
                      }
                    )}
                    onChange={onInputChangeHandler}
                    required
                  />
                  {FieldError && !dirty.name && <FieldError id="name" />}
                </div>
                <div className="mb-4">
                  <label className="block text-lg ml-4 pb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={cx(
                      "px-4 py-4 w-full rounded-md border border-solid border-blue-500 bg-transparent",
                      {
                        "border-red-500":
                          state.type === "invalid" &&
                          state.validated.email &&
                          !dirty.email,
                      }
                    )}
                    onChange={onInputChangeHandler}
                    required
                  />
                  {FieldError && !dirty.email && <FieldError id="email" />}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-lg ml-4 pb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={cx(
                    "block px-4 py-4 w-full rounded-md border border-solid border-blue-500 bg-transparent",
                    {
                      "border-red-500":
                        state.type === "invalid" &&
                        state.validated.message &&
                        !dirty.message,
                    }
                  )}
                  onChange={onInputChangeHandler}
                  required
                />
                {FieldError && !dirty.message && <FieldError id="message" />}
              </div>
              <SubmitButton />
              <small className="font-sans text-xs">
                This site is protected by reCAPTCHA and the Google{" "}
                <Link
                  className="underline hover:underline-offset-2"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  className="underline hover:underline-offset-2"
                  href="https://policies.google.com/terms"
                  target="_blank"
                >
                  Terms of Service
                </Link>{" "}
                apply.
              </small>
              {state.type === "error" && (
                <div className="p-4 mt-4 rounded-md bg-red-500 text-white text-sm">
                  <p>
                    There was an error trying to send your message. Please try
                    again.
                  </p>
                </div>
              )}
            </form>
          </>
        )}
      </div>
      <Notifications notifications={notifications} />
    </>
  );
}
