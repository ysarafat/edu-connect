import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmails(emailInfo) {
  if (!emailInfo) {
    return null;
  }
  const sent = Promise.all(
    emailInfo.map(async (data) => {
      if (data.to && data.message && data.subject) {
        const sentInfo = await resend.emails.send({
          from: "noreply@mail.yeasir.me",
          to: data.to,
          subject: data.subject,
          text: data.message,
        });
        return sentInfo;
      } else {
        return Promise.reject(
          new Error(`Invalid email data: ${JSON.stringify(data)}`)
        );
      }
    })
  );
  return sent;
}
