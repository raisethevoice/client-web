import { Link } from 'react-router-dom';

const links = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of service', to: '/terms' },
  {
    label: 'Contribute',
    to: 'https://github.com/raisethevoice/raisethevoice',
    target: '_blank',
  },
];

export default function Footer() {
  return (
    <div className="mt-8">
      <div className="flex justify-center gap-x-2 flex-wrap text-center text-sm">
        {links.map((link) => (
          <>
            <Link {...link} className="hover:underline">
              {link.label}
            </Link>
            <span className="opacity-50">·</span>
          </>
        ))}
      </div>
      <div className="text-center mt-2">© 2024 RaiseTheVoice</div>
    </div>
  );
}
