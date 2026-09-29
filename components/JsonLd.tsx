// One job: render one or more schema.org objects as a JSON-LD script tag.
// `<` is escaped so no string in the data can close the script element early.

export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
