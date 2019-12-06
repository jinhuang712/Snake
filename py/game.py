import pygame


class Game:
    def __init__(self, row_count=50, col_count=50):
        self.row_count = row_count
        self.col_count = col_count

    def run(self):
        pygame.init()
        frame = pygame.display.set_mode((self.row_count, self.col_count))
