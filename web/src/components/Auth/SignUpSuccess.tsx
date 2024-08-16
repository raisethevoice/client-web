import { HiOutlineExternalLink } from 'react-icons/hi';

type SignUpSuccessProps = {
  email: string;
};

export default function SignUpSuccess({ email }: SignUpSuccessProps) {
  const mailBoxUrl = getMailboxUrl(email);

  return (
    <div className="bg-white p-6  min-h-[300px] md:mx-auto">
      <svg
        viewBox="0 0 24 24"
        className="text-green-600 w-16 h-16 mx-auto my-6"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Verify Your Email
        </h3>
        <p className="text-gray-600 my-2">
          Please check your email and verify your account to complete the
          registration process.
        </p>

        {mailBoxUrl ? (
          <a
            href={mailBoxUrl}
            target="_blank"
            className="inline-flex items-center gap-2 my-10 text-center rounded-lg py-3 px-10 bg-black !text-white font-semibold"
          >
            Open Mailbox
            <HiOutlineExternalLink className="text-white" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

const getMailboxUrl = (email: string) => {
  const domain = email?.split('@')[1]?.toLowerCase();

  switch (domain) {
    case 'gmail.com':
      return 'https://mail.google.com/';
    case 'outlook.com':
    case 'hotmail.com':
    case 'live.com':
    case 'msn.com':
      return 'https://outlook.live.com/mail/';
    case 'yahoo.com':
      return 'https://mail.yahoo.com/';
    case 'icloud.com':
      return 'https://www.icloud.com/mail/';
    case 'aol.com':
      return 'https://mail.aol.com/';
    case 'protonmail.com':
      return 'https://mail.protonmail.com/';
    case 'zoho.com':
      return 'https://mail.zoho.com/';
  }
};
