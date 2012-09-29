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

  def to_view
    isIt? ? "YES" : "NO"
  end

  # Seconds until my birthday
  def seconds_to_go
    if not isIt?
      next_birthday.to_i - Time.now.to_i
    else
      0
    end
  end

  # Calculates the next birthday
  def next_birthday
    year = @year
    if @birthday_month < @month or
       (@birthday_month == @month and @birthday_day < @day)
      year = @year + 1
    end

    Time.parse(DateTime.new(year, @birthday_month, @birthday_day).to_s)
  end

end
