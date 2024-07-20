// pages/index.tsx
import { useState } from "react";

export default function TestComp() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject,
        text: message,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Email sent successfully");
      setPreviewUrl(data.previewUrl);
    } else {
      alert(`Failed to send email: ${data.error}`);
    }
  };

  return (
    <div>
      <h1>Send an Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {previewUrl && (
        <div>
          <h2>Email Preview URL:</h2>
          <a href={previewUrl} target="_blank" rel="noopener noreferrer">
            {previewUrl}
          </a>
        </div>
      )}
    </div>
  );
}
