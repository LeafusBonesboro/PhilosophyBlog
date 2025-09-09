export default function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form className="mt-4 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg p-2"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded-lg p-2"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border rounded-lg p-2"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
