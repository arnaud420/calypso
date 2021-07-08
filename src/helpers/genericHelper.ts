import { showMessage } from 'react-native-flash-message';

export const formatTimeSince = (dateInSeconds: number): string => {
  const nowInSeconds = new Date().getTime() / 1000;
  const diffInSeconds: number = (nowInSeconds - dateInSeconds);

  if (diffInSeconds < 60) {
    return `${Math.round(diffInSeconds)} seconde${Math.round(diffInSeconds) > 1 ? 's' : ''}`;
  }

  const diffInMinutes: number = diffInSeconds / 60;

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minute${Math.round(diffInMinutes) > 1 ? 's' : ''}`;
  }

  const diffInHours: number = diffInMinutes / 60;

  if (diffInHours < 24) {
    return `${Math.round(diffInHours)} heure${Math.round(diffInHours) > 1 ? 's' : ''}`;
  }

  const diffInDays: number = diffInHours / 24;

  if (diffInDays === 1) {
    return 'hier';
  }

  const date = new Date(dateInSeconds * 1000);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
};

export const handleError = (error: Error) => {
  console.error(`Une erreur est survenue : ${error}`);

  showMessage({
    message: `Une erreur est survenue : ${error.message}`,
    type: 'danger',
  });
}
