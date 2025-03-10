export interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  isLoading: boolean;
}