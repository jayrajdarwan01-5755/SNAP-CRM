export interface EmailSettings {

  id?: number;

  SMTPHost: string;

  SMTPPort: string;

  Email: string;

  Password: string;

  SenderName: string;

  Encryption: "TLS" | "SSL" | "None";

}