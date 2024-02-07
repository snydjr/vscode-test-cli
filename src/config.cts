require 'vara'

class SportsWageringGame
  def initialize
    @bookmaker = VARA::Bookmaker.new
    @player_balance = 1000
  end

  def start
    puts "Welcome to the Sports Wagering Game!"
    puts "Your current balance is $#{@player_balance}."
    puts "Let's place some bets!\n\n"

    while @player_balance.positive?
      display_menu
      choice = gets.chomp.to_i
      case choice
      when 1
        place_bet
      when 2
        break
      else
        puts "Invalid choice. Please try again."
      end
    end

    puts "Thanks for playing! Your final balance is $#{@player_balance}."
  end

  private

  def display_menu
    puts "Menu:"
    puts "1. Place a bet"
    puts "2. Quit"
    print "Enter your choice: "
  end

  def place_bet
    puts "Available sports events:"
    display_events
    print "Enter the event number you want to bet on: "
    event_number = gets.chomp.to_i
    event = @bookmaker.events[event_number - 1]

    if event.nil?
      puts "Invalid event number."
      return
    end

    print "Enter your bet amount: $"
    bet_amount = gets.chomp.to_i

    if bet_amount > @player_balance
      puts "Insufficient balance."
      return
    end

    print "Enter the outcome (Win/Loss): "
    outcome = gets.chomp.downcase

    if !%w[win loss].include?(outcome)
      puts "Invalid outcome."
      return
    end

    event_outcome = outcome == 'win' ? :win : :loss
    winnings = @bookmaker.calculate_winnings(event, event_outcome, bet_amount)

    if winnings.nil?
      puts "Invalid event outcome."
    else
      @player_balance += winnings
      puts "Congratulations! You won $#{winnings}. Your new balance is $#{@player_balance}."
    end
  end

  def display_events
    @bookmaker.events.each_with_index do |event, index|
      puts "#{index + 1}. #{event.name} - #{event.odds}"
    end
  end
end

# Example usage
game = SportsWageringGame.new
game.start
}
