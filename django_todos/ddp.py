from dddp.api import API, APIMixin, Collection, Publication, api_endpoint
from dddp.models import get_meteor_id, get_object, get_object_id
import models

from django.contrib.auth.models import User
from django.db.models import Q

class Task(Collection):
    model = models.Task

    @api_endpoint('addTask')
    def add_task(self, text, meteor_id):
      u = User.objects.get(pk=get_object_id(User, meteor_id))
      obj = models.Task(text=text, owner=meteor_id, username=u.username, checked=False)
      obj.save()


    @api_endpoint('setChecked')
    def set_checked(self, meteor_id, val):
      obj = models.Task.objects.get(pk=get_object_id(models.Task, meteor_id))
      obj.checked = val
      obj.save()

    @api_endpoint('deleteTask')
    def delete_task(self, meteor_id):
      obj = models.Task.objects.get(pk=get_object_id(models.Task, meteor_id))
      obj.delete()

    @api_endpoint('setPrivate')
    def set_private(self, meteor_id, val):
      obj = models.Task.objects.get(pk=get_object_id(models.Task, meteor_id))
      obj.private = val
      obj.save()


class Tasks(Publication):

  def get_queries(self, userId):
    return [
        models.Task.objects.filter(Q(owner=userId) | Q(private=False)),
    ]


API.register([
    Task,
    Tasks,
])
