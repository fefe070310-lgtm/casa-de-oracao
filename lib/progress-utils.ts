export type Lesson = {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  materialsUrl?: string;
  pdfUrl?: string;
  allowDownload: boolean;
  order: number;
  moduleId: string;
};

export type UserProgress = {
  lessonId: string;
  completed: boolean;
};

/**
 * Verifica se uma lição está desbloqueada com base no progresso do usuário.
 * Uma lição está desbloqueada se:
 * 1. For a primeira lição (order 0)
 * 2. A lição anterior (order-1) estiver concluída.
 */
export function isLessonUnlocked(lesson: Lesson, allLessons: Lesson[], userProgress: UserProgress[]) {
  if (lesson.order === 0) return true;

  const previousLesson = allLessons.find(l => l.order === lesson.order - 1 && l.moduleId === lesson.moduleId);
  
  if (!previousLesson) return true; // Se não achou a anterior, bug de ordem, mas deixa passar ou trava? Por segurança deixa true se não existir lógica.

  const isPreviousCompleted = userProgress.find(p => p.lessonId === previousLesson.id)?.completed;
  
  return !!isPreviousCompleted;
}

/**
 * Verifica se um módulo está desbloqueado. 
 * (Opcional: Pode exigir que todas as aulas do módulo anterior estejam concluídas)
 */
export function isModuleUnlocked(moduleOrder: number, prevModuleLessons: Lesson[], userProgress: UserProgress[]) {
  if (moduleOrder === 0) return true;

  return prevModuleLessons.every(lesson => 
    userProgress.find(p => p.lessonId === lesson.id)?.completed
  );
}
