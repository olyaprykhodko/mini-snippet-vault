export default function Header() {
  return (
    <div className="max-w-2xl min-w-0">
      <p className="mb-2 wrap-break-word text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 sm:tracking-[0.18em]">
        Personal snippet
      </p>
      <h1 className="wrap-break-word text-3xl font-semibold tracking-[0.12em] text-emerald-900 sm:tracking-widest md:text-4xl">
        Vault
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
        Store and search code notes, links and commands in a compact workspace.
      </p>
    </div>
  );
}
