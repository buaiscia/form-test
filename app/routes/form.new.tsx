import { ActionArgs, LoaderFunction, json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";

export const action = async ({ request }: ActionArgs) => {
  // TODO: remove me
  await new Promise((res) => setTimeout(res, 2200));

  const formData = await request.formData();
  const name = formData.get("name");
  const content = formData.get("content");
  const phone = formData.get("phone");

  console.log(formData.get("name"));

  if (!name || !content || !phone) {
    return json(
      {
        errors: {
          name: !name ? "Name is required" : null,
          content: !content ? "Content is required" : null,
          phone:
            typeof phone !== "number" ? "Phone number must be a number" : null, //doesn't work
        },
      },
      { status: 400 }
    );
  }

  return redirect("/form");
};

export default function FormPage() {
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.content) {
      contentRef.current?.focus();
    } else if (actionData?.errors?.phone) {
      phoneRef.current?.focus();
    }
  }, [actionData]);

  const navigation = useNavigation();
  const isCreating = Boolean(navigation.state === "submitting");

  return (
    <Form method="post" className="flex flex-col items-center mt-8">
      <label className="flex flex-col w-full max-w-md">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          name="name"
          className="border-2 border-black-200"
          ref={nameRef}
        />
        {actionData?.errors?.name && (
          <span className="text-red-500">{actionData.errors.name}</span>
        )}
      </label>
      <label className="flex flex-col w-full max-w-md">
        <span className="text-gray-700">Content:</span>
        <input
          name="content"
          className="border-2 border-black-200"
          ref={contentRef}
        />
        {actionData?.errors?.content && (
          <span className="text-red-500">{actionData.errors.content}</span>
        )}
      </label>
      <label className="flex flex-col w-full max-w-md">
        <span className="text-gray-700">Phone:</span>
        <input
          type="text"
          name="phone"
          className="border-2 border-black-200"
          ref={phoneRef}
        />
        {actionData?.errors?.phone && (
          <span className="text-red-500">{actionData.errors.phone}</span>
        )}
      </label>
      <button
        type="submit"
        disabled={isCreating}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {/* Submit */}
        {isCreating ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}
