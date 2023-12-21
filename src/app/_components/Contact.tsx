"use client";

import cx from "classnames";
import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/_utils/actions/submitContactForm";

const initialState = {
  type: "",
};

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

  if (state.type === "submitted") {
    return <div>Submitted</div>;
  }

  return (
    <div className="max-w-screen-md">
      <form className="flex flex-col mb-6" action={formAction} noValidate>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="mb-4">
            <label className="block text-lg ml-4 pb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="px-4 py-4 w-full rounded-md border border-solid border-blue-500 bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg ml-4 pb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="px-4 py-4 w-full rounded-md border border-solid border-blue-500 bg-transparent"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg ml-4 pb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="px-4 py-4 w-full rounded-md border border-solid border-blue-500 bg-transparent"
            required
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
