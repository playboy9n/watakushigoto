json.array! @events, partial: "events/event", as: :event

json.array!(@events) do |event|
  json.extract! event, :user_id :title, :description, :end, :start, :color, :allday
  json.start event.start
  json.end event.end
  json.url event_url(event, format: :html)
end