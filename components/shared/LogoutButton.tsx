import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/50"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
