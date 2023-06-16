import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getForms } from "~/models/post.server";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const { description, title } = data
    ? {
        description: `Enjoy the "${data.form[0].name}" form`,
        title: `"${data.form[0].name}" form`,
      }
    : { description: "No form found", title: "No form" };

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title },
  ];
};

export const loader = async ({ params }: LoaderArgs) => {
  console.log("params", params);
  const form = await getForms(params.formId);
  invariant(form, `Forms not found`);

  if (form.length === 0) {
    throw new Response("whoops Form Not found.", {
      status: 404,
    });
  }

  return json({ form });
};

export default function SingleForm() {
  const { form } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{form[0].name}</h1>
    </main>
  );
}

export function ErrorBoundary() {
  const { formId } = useParams();

  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error-container">Huh? What the heck is "{formId}"?</div>
    );
  }

  return (
    <div className="error-container">
      There was an error loading form by the id "{formId}". Sorry.
    </div>
  );
}
