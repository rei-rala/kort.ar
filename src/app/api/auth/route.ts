import { NextResponse } from "next/server";

const defaultProfile = {
  name: "Kort.ar",
  email: "info@kort.ar",
  avatarUrl: "https://avatars.githubusercontent.com/u/8908519?v=4",
  communications: {
    notifications: [
      {
        id: "1",
        title: "Bienvenido a Kort.ar",
        description:
          "Gracias por registrarte en Kort.ar, esperamos que disfrutes de la experiencia!",
        date: new Date(),
        read: false,
      },
      {
        id: "2",
        title: "Valida tu email en Kort.ar",
        description:
          "Revisa tu bandeja de entrada y valida tu email para poder disfrutar de todas las funcionalidades de Kort.ar",
        date: new Date(),
        read: false,
      },
    ],
  },
};

export function GET(request: Request) {
  return NextResponse.json({ profile: defaultProfile });
}
