import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getReferralKey } from '../utils/referral';
import { Trophy, Edit2, Save, Users, Eye, EyeOff } from 'lucide-react';

const API_BASE_URL = 'https://oman-car-hub.replit.app';

const Leaderboard = ({ language, t }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userName, setUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentlyApplied, setCurrentlyApplied] = useState([]);
  const [showReferralKey, setShowReferralKey] = useState(false);
  const referralKey = getReferralKey();

  useEffect(() => {
    fetchLeaderboard();
    fetchUserName();
    fetchCurrentlyApplied();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      } else {
        toast.error(t.failedToFetchLeaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error(t.failedToFetchLeaderboard);
    }
  };

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user-name/${referralKey}`);
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name || '');
        setIsEditing(data.name === 'Anonymous' || data.name === '');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const fetchCurrentlyApplied = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/currently-applied`);
      if (response.ok) {
        const data = await response.json();
        setCurrentlyApplied(data);
      } else {
        toast.error(t.failedToFetchCurrentlyApplied);
      }
    } catch (error) {
      console.error('Error fetching currently applied:', error);
      toast.error(t.failedToFetchCurrentlyApplied);
    }
  };

  const handleUpdateUserName = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user-name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referralKey, name: userName }),
      });
      if (response.ok) {
        toast.success(t.userNameUpdated);
        setIsEditing(false);
        fetchLeaderboard();
        fetchCurrentlyApplied();
      } else {
        toast.error(t.failedToUpdateUserName);
      }
    } catch (error) {
      console.error('Error updating user name:', error);
      toast.error(t.failedToUpdateUserName);
    }
  };

  const toggleReferralKeyVisibility = () => {
    setShowReferralKey(!showReferralKey);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Trophy className="mr-2" />
            {t.todaysLeaderboard}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t.yourReferralInfo}</h3>
            <div className="flex items-center mt-2">
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t.enterYourName}
                disabled={!isEditing}
                className="mr-2"
              />
              {isEditing ? (
                <Button onClick={handleUpdateUserName} disabled={!userName.trim()}>
                  <Save className="mr-2 h-4 w-4" /> {t.save}
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit2 className="mr-2 h-4 w-4" /> {t.edit}
                </Button>
              )}
            </div>
            <div className="mt-2 flex items-center">
              <span className="mr-2">{t.referralKey}:</span>
              <span className="font-mono">
                {showReferralKey ? referralKey : '••••••••-••••-••••-••••-••••••••••••'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleReferralKeyVisibility}
                className="ml-2"
              >
                {showReferralKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.rank}</TableHead>
                <TableHead>{t.name}</TableHead>
                <TableHead>{t.referrals}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={entry.referralKey}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2" />
            {t.currentlyApplied}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.rank}</TableHead>
                <TableHead>{t.name}</TableHead>
                <TableHead>{t.points}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentlyApplied.map((entry, index) => (
                <TableRow key={entry.referralKey}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;