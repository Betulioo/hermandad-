export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-4 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Parroquia Santa María la Antigua
      </div>
    </footer>
  );
}
