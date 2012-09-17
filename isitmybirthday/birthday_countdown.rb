class BirthdayCountdown

  def initialize(month, day)
    @birthday_month = month
    @birthday_day = day

    # Current date
    @year = Time.now.year
    @month = Time.now.month
    @day = Time.now.day
  end

  # Is it birthday
  def isIt?
    @month == @birthday_month && @day == @birthday_day
  end

  # Seconds until my birthday
  def seconds_to_go
    next_birthday.to_i - Time.now.to_i
  end

  def next_birthday

  end

end
