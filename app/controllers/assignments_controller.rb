class AssignmentsController < ApplicationController
  skip_before_action :authorize, only: :create

  # def index
  #   @assignments = assignment.all
  # end

  def create
    byebug
    assignment = Assignment.create!(new_assignment_params)
    render json: assignment, status: :accepted
  end

  # def update
  #   assignment_to_update = find_assignment
  #   assignment_to_update.avatar.attach(params[:avatar])
  #   assignment_to_update.update!(update_assignment_params)
  #   render json: assignment, status: :accepted
  # end

  # def destroy
  #   assignment_to_delete = find_assignment
  #   assignment_to_delete.destroy
  #   head :no_content
  # end

  private

  def new_assignment_params
    params.permit(:name, :subject, :attachments, :notes)
  end

  # def update_assignment_params
  #   params.permit()
  # end

  # def find_assignment
  #   Assignment.find(params[:id])
  # end
end
