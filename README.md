# Duckle

[Click here to see deployed game](https://charlotte-rmt-wdpt-mar2023.github.io/ironhack-game-project/)

## Description

Duckle is a children's game where players have to type the words that appear on the screen. The game ends when the player has scored the set number of points or has lost all of their lives.



## Main Functionalities
- Words move automatically across the screen from right to left or left to right
- Players may type the words on the screen in any order
- If the word has left the screen before the player types it, the point for that word is no longer available
- Words disappear from the screen once they have been typed
- The player wins the game when they type the number of words set in their goal
- The player loses the game when their time runs out before they have reached their goal

## Backlog
- The game has 4 dificulty levels, they are:
    - kids: words of 3 or 4 letters
    - easy: words of 4 or 5 letters
    - medium: words of 5, 6 or 7 letters
    - hard: words of 5 to 10 letters
    - German: German is known for having some of the longest words in the world, so this level is especially challenging
- The speed increases as the levels get harders
- The player can make the game more dificult by increasing the goal


## Data structure

Classes
- WordGenerator

Functions
- togglescreen()
- moveWords()
- checkWord()
- loseLife()
- countdown()
- win()
- lose()
- game()
    
## States
- Start Screen
- Game Screen
- Game Over Screen


