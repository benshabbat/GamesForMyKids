/**
 * ===============================================
 * מחלקות אבסטרקטיות ופאטרנים - SOLID Principles
 * ===============================================
 */

/**
 * מחלקה אבסטרקטית בסיסית - עקרון Dependency Inversion
 */
export abstract class BaseEntity {
  protected constructor(
    protected readonly _id: string,
    protected readonly _createdAt: Date = new Date()
  ) {}

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public abstract validate(): boolean;
  public abstract serialize(): Readonly<Record<string, string | number | boolean>>;
}

/**
 * ממשק לאובייקט הניתן לזיהוי - עקרון Interface Segregation
 */
export interface Identifiable<TId = string> {
  readonly id: TId;
}

/**
 * ממשק לאובייקט שניתן לסידוק - עקרון Interface Segregation
 */
export interface Serializable<T = Readonly<Record<string, string | number | boolean>>> {
  serialize(): T;
}

/**
 * ממשק לאובייקט שניתן לוולידציה - עקרון Interface Segregation
 */
export interface Validatable {
  validate(): boolean;
}

/**
 * ממשק לאובייקט עם חותמת זמן - עקרון Interface Segregation
 */
export interface Timestamped {
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}

/**
 * מחלקה אבסטרקטית למשחק - עקרון Open/Closed
 */
export abstract class BaseGame extends BaseEntity {
  protected constructor(
    id: string,
    protected readonly _title: string,
    protected readonly _description: string
  ) {
    super(id);
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public abstract start(): void;
  public abstract pause(): void;
  public abstract resume(): void;
  public abstract stop(): void;
  public abstract reset(): void;

  public validate(): boolean {
    return this._title.length > 0 && this._description.length > 0;
  }

  public serialize(): Readonly<Record<string, string | number | boolean>> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt.toISOString()
    };
  }
}

/**
 * ממשק למנהל מצב משחק - עקרון Single Responsibility
 */
export interface GameStateManager<TState> {
  readonly currentState: TState;
  updateState(newState: Partial<TState>): void;
  resetState(): void;
  getSnapshot(): TState;
}

/**
 * ממשק למנהל אירועים - עקרון Single Responsibility
 */
export interface EventManager<TEvent> {
  emit(event: TEvent): void;
  subscribe(listener: (event: TEvent) => void): () => void;
  unsubscribe(listener: (event: TEvent) => void): void;
  clear(): void;
}

/**
 * ממשק לניקוד משחק - עקרון Single Responsibility
 */
export interface ScoreCalculator {
  calculateScore(params: ScoreParams): number;
  getBonus(params: BonusParams): number;
}

/**
 * פרמטרים לחישוב ניקוד - עקרון Single Responsibility
 */
export interface ScoreParams {
  readonly baseScore: number;
  readonly timeBonus?: number;
  readonly difficultyMultiplier?: number;
  readonly streakBonus?: number;
}

/**
 * פרמטרים לחישוב בונוס - עקרון Single Responsibility
 */
export interface BonusParams {
  readonly consecutiveCorrect: number;
  readonly timeRemaining: number;
  readonly difficulty: string;
}

/**
 * פאטרן Observer לעדכוני מצב - עקרון Dependency Inversion
 */
export interface Observer<T> {
  update(data: T): void;
}

/**
 * פאטרן Subject לניהול Observers - עקרון Dependency Inversion
 */
export interface Subject<T extends object = object> {
  attach(observer: Observer<T>): void;
  detach(observer: Observer<T>): void;
  notify(data: T): void;
}

/**
 * בסיס לזיהוי type עם config - עקרון DRY
 */
export interface TypedConfiguration {
  readonly type: string;
  readonly config: Readonly<Record<string, object>>;
}

// הערה: ExecutionContext ו-GameCreationConfig מחוקים - הם זהים ל-TypedConfiguration (עקרון DRY)

/**
 * תוצאת ביצוע אסטרטגיה - עקרון Single Responsibility
 */
export interface ExecutionResult {
  readonly success: boolean;
  readonly data?: object;
  readonly error?: string;
}

/**
 * ממשק לאסטרטגיית משחק - עקרון Strategy Pattern
 */
export interface GameStrategy {
  execute(context: TypedConfiguration): ExecutionResult;
  canHandle(type: string): boolean;
}

// הערה: GameCreationConfig מחוק - זהה ל-TypedConfiguration (עקרון DRY)

/**
 * Factory לייצור משחקים - עקרון Factory Pattern
 */
export interface GameFactory<T extends BaseGame> {
  createGame(config: TypedConfiguration): T;
  getSupportedTypes(): ReadonlyArray<string>;
}
