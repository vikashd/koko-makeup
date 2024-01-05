"use client";

import cx from "classnames";
import { useFormState, useFormStatus } from "react-dom";
import { useMemo, useState } from "react";
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
      className={cx("p-4 bg-blue-900 hover:bg-blue-800 rounded-md", {
        "opacity-40": pending,
      })}
      type="submit"
      aria-disabled={pending}
    >
      Submit
    </button>
  );
}

export function Contact() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const [dirty, setDirty] = useState<{ [key in keyof EmailForm]?: boolean }>(
    {}
  );

  const FieldError = useMemo(() => {
    if (state.type === "invalid") {
      return withErrors({ errors: state.validated });
    }

    return null;
  }, [state]);

  const onInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    const result = schema
      .pick({ [name]: true })
      .safeParse({ [name]: e.target.value });

    setDirty({ ...dirty, [name]: result.success });
  };

  if (state.type === "submitted") {
    return (
      <div className="max-w-screen-md">
        <p>Thanks for your message! I&lsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md">
      <p className="mb-4">
        For general enquiries please feel free to contact me and I&lsquo;ll aim
        to get back to you within 24&nbsp;hours.
      </p>
      <p className="mb-4">Alternatively you can call me on +44 7903 444712.</p>
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
        {state.type === "error" && (
          <div className="p-4 mt-4 rounded-md bg-red-500 text-white text-sm">
            <p>
              There was an error trying to send your message. Please try again.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
