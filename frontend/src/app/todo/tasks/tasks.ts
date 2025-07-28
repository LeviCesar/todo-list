import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private todoService = inject(TodoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  tasks: { id: string, text: string; done: boolean }[] = [];
  newTask = '';
  errorMessage: string | null = null;

  constructor(private cdRef: ChangeDetectorRef) {
    this.todoService.getTasks().subscribe({
      next: (response: any) => {
        this.tasks = response.tasks.map((task: any) => ({
          id: task.id,
          text: task.description,
          done: task.status
        }));
        this.cdRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar tarefas.';
      }
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  addTask() {
    const text = this.newTask.trim();
    if (!text) return;

    this.todoService.addTask(text).subscribe({
      next: (id) => {
        if (!id) {
          this.errorMessage = 'Erro ao adicionar tarefa.';
          return;
        }
        this.tasks.push({ id, text, done: false });
        this.newTask = '';
        this.cdRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erro ao adicionar tarefa.';
      }
    });
  }

  toggleDone(id: string) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) return;

    task.done = !task.done;
    this.todoService.statusTask(id, !task.done).subscribe({
      next: (res: any) => {
        task.done = res.status;
        this.cdRef.detectChanges();
      },
      error: () => {
        task.done = !task.done;
        this.errorMessage = 'Erro ao atualizar o status da tarefa.';
      }
    });
  }

  deleteTask(id: string) {
    this.todoService.removeTask(id).subscribe({
      next: () => {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
        this.cdRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erro ao remover a tarefa.';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}