import { useState } from "react";

const ContactForm = ({ accessKey }) => {
    const [result, setResult] = useState("");
    const [sending, setSending] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        setResult("Sending...");

        const form = e.target;
        const formData = new FormData(form);
        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (response.ok && data.success) {
                setResult("Form Submitted Successfully ✅");
                form.reset();
            } else {
                throw new Error("API returned error");
            }
        } catch {
            setResult("Error ❌");
        } finally {
            setSending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input name="name" required className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                    name="message"
                    required
                    rows="5"
                    className="w-full rounded-xl border px-3 py-2"
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition"
            >
                {sending ? "Sending..." : "Send Message"}
            </button>
            {result && <p className="text-center text-sm mt-2">{result}</p>}
        </form>
    );
};

export default ContactForm;
