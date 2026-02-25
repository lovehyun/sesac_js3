import { NextResponse } from "next/server";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

const todos: Todo[] = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const text = body.text.trim();
  if (!text) {
    return new NextResponse("입력값 누락", {status: 400});
  }

  const todo: Todo = {
    id: Date.now(),
    text,
    done: false,
  };

  todos.unshift(todo);
  return NextResponse.json(todo, { status: 201 });
}
