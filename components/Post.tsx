export function Title({ children }: { children: string }) {
  return <h3 className="my-2 font-ibm font-bold text-4xl">{children}</h3>;
}

export function Date({ children }: { children: string }) {
  return (
    <h6 className="mt-2 mb-2 font-ibm text-lg text-red-500">{children}</h6>
  );
}

export function Tags({ value }: { value: string[] }) {
  return (
    <ul className="flex space-x-4">
      {value.map((t) => (
        <li key={t} className="font-ibm text-gray-400 dark:gray-300">
          #{t}
        </li>
      ))}
    </ul>
  );
}
