type Form = {
  name: string;
  content: string;
  phone: number;
};

const forms = [
  {
    name: "alex",
    content: "test1",
    phone: 3232132,
  },
  {
    name: "john",
    content: "test2",
    phone: 312322,
  },
];

export async function getForms(formId?: string): Promise<Array<Form>> {
  if (formId === undefined) return forms;

  return forms.filter((form) => form.name === formId);
}
