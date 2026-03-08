export default function Header() {
  return (
    <div className="max-w-2xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Personal snippet
      </p>
      <h1 className="text-3xl font-semibold tracking-widest text-emerald-900 md:text-4xl">
        Vault
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
        Store and search code notes, links and commands in a compact workspace.
      </p>
    </div>
  );
}
