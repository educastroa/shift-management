export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
};

export type ShiftNotes = {
  date_created: string;
  id: string;
  notes: string;
  user_id: string;
};
