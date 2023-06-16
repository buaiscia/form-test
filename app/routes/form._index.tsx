import { ActionArgs, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigation } from "@remix-run/react";
import { getForms } from "~/models/post.server";

export const loader = async ({ params, request }: ActionArgs) => {
  console.log("params", params);
  console.log("request", request);
  return json({ forms: await getForms() });
};

export default function FormIndexPage() {
  const { forms } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="mb-10">
        <Link to="new" className="text-blue-500 underline">
          create a new form.
        </Link>
      </div>
      <div>
        <ul>
          {forms.map((form) => (
            <li key={form.name} className="mb-4">
              <Link
                prefetch="intent"
                to={form.name}
                className="text-blue-600 underline"
              >
                <p>Name: {form.name}</p>
                <p>Content: {form.content}</p>
                <p>Phone: {form.phone}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
