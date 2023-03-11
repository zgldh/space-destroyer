export namespace Config {
  export const SPACE_HEIGHT = 600;
  export const SPACE_WIDTH = 400;
  export const SPACE_BORDER_TOP = 32;
  export const SPACE_BORDER_BOTTOM = SPACE_HEIGHT - SPACE_BORDER_TOP;
  export const SPACE_BORDER_LEFT = 32;
  export const SPACE_BORDER_RIGHT = SPACE_WIDTH - SPACE_BORDER_LEFT;

  export const BACKGROUND_STAR_HEIGHT = 16;
  export const BACKGROUND_STAR_WIDTH = 16;
  export const BACKGROUND_STAR_INTERVAL = 250;
  export const BACKGROUND_STAR_MOVEMENT_SPEED_MIN = 50;
  export const BACKGROUND_STAR_MOVEMENT_SPEED_MAX = 150;
  export const BACKGROUND_STAR_MAX_COUNT = 20;
  export const BACKGROUND_STAR_PROBABILITY = 0.05;

  export const PLANCK_TIME = 33.3333;

  export const PLAYER_BULLET_INTERVAL = 150;
  export const PLAYER_BULLET_SPEED_Y = 0.5; // 1 pixels per millisec
  export const PLAYER_BULLET_TOP_BORDER = -50; // Bullet disappears
  export const PLAYER_BULLET_HEIGHT = 10;
  export const PLAYER_BULLET_WIDTH = 20;

  export const SPACESHIP_HEIGHT = 64;
  export const SPACESHIP_WIDTH = 64;
  export const SPACESHIP_START_X = SPACE_WIDTH / 2;
  export const SPACESHIP_START_Y = SPACE_HEIGHT / 10 * 9;
  export const SPACESHIP_SPEED = 5;

  export const ENEMY_HEIGHT = 64;
  export const ENEMY_WIDTH = 64;
}