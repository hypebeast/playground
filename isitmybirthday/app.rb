require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'haml'
require 'birthday_countdown'


class IsItMyBirthday < Sinatra::Base

  get '/' do
    haml :index
  end

  get '/countdown' do
    day = params[:day].to_i
    month = params[:month].to_i
    birthday = BirthdayCountdown.new(month, day)
    @timeleft = birthday.seconds_to_go.to_s

    haml :countdown
  end

  get '/birthday' do
    day = params[:day].to_i
    month = params[:month].to_i
    birthday = BirthdayCountdown.new(month, day)
    @isItBirthday = birthday.to_view

    haml :birthday
  end

end

