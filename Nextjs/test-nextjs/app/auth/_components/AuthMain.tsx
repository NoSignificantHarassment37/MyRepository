import UnlockButton from "@/app/_components/UnlockButton";
import NavigationButton from "@/app/_components/NavigationButton";
export default function AuthMain() {
  return (
    <main>
      <section className="grid m-10" id="auth">
        <h2 className="text-text font-bold text-">Unlock Vault</h2>

        <label className="text-text">Master password:</label>
        <input
          type="password"
          id="master-password"
          placeholder="Enter your master password"
          className="border-sky-500 border-3 rounded-md"
        />
        <div className="flex gap-5">
          <UnlockButton></UnlockButton>
          <NavigationButton route="/">⬅ Back</NavigationButton>
        </div>
      </section>
    </main>
  );
}
