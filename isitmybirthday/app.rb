require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'haml'
require 'birthday_countdown'


class IsItMyBirthday < Sinatra::Base

  get '/' do
    haml :index
  end

end

