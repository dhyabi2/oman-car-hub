import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from 'lucide-react';

const OfflineNotification = ({ t }) => (
  <Alert variant="destructive" className="mb-4">
    <WifiOff className="h-4 w-4" />
    <AlertTitle>{t.offlineTitle}</AlertTitle>
    <AlertDescription>{t.offlineDescription}</AlertDescription>
  </Alert>
);

export default OfflineNotification;