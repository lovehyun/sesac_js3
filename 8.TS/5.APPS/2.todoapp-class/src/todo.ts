interface TodoI {
    id: number;
    title: string;
    completed: boolean;
}

export class Todo implements TodoI {
    public id: number;
    public title: string;
    public completed: boolean;

    constructor(title: string) {
        this.id = Date.now();
        this.title = title;
        this.completed = false;
    }

    toggle(): void {
        this.completed = !this.completed;
    }
}
