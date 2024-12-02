import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Pastikan komponen Button sudah terimport

const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      {/* Kontainer untuk children dan tombol Back */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg">
        {children}
        {/* Tombol Back */}
        <Link href="/" passHref>
          <Button size="sm" variant="outline" className="mt-4 w-full sm:w-auto">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AuthLayout;
