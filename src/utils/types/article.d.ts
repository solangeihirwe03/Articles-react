
export interface IArticle {
    id: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
}
export interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;  // ✅ Fixed Typo
  logout: () => void;
}
export interface AuthProviderProps {
    children: ReactNode;
  }