class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  PER = 15
def events
    @event = Event.all
    # render :json => @event
    respond_to do |format|
      format.json {
        render json:
        @event.to_json(
          only: [:title, :start, :end, :destroy]
        )
      }
    end
  end
  # GET /events
  # GET /events.json
  def index
    @q = Event.where(user_id: current_user.id).ransack(params[:q])
    @events= @q.result.page(params[:page]).per(PER)
    respond_to do |format|
      format.html
      format.xml { render :xml => @events }
      format.json { render :json  =>  @events }
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
  end

  # POST /events
  # POST /events.json
  def create
    @event = current_user.events.build(event_params)
    respond_to do |format|
      if @event.save
        format.html { redirect_to user_path(current_user.id) }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { redirect_to user_path(current_user.id) }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to user_path(current_user.id) }
        format.json { render :show, status: :ok, location: @event }
        flash[:notice] = '予定を変更しました！'
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    p params
    @event = Event.find_by(id: params[:id])
    @event.destroy
    respond_to do |format|
      format.html { redirect_to user_path(current_user.id) }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find_by(id: params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(
        :title,
        :description,
        :start,
        :end,
        :color,
        :allday)
    end
end
