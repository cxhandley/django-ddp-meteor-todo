from dddp.api import API, APIMixin, Collection, Publication, api_endpoint
from dddp.models import get_meteor_id, get_object
import models


class Task(Collection):
    model = models.Task

    @api_endpoint('insert')
    def insert(self, params):
      obj = models.Task(text=params['text'], owner=params['owner'], username=params['username'], checked=False)
      obj.save()
      obj.meteor_id = get_meteor_id(obj)
      obj.save()

    @api_endpoint('remove')
    def remove(self, params):
      obj = models.Task.objects.filter(meteor_id=params['_id'])
      obj.delete()

    @api_endpoint('update')
    def update(self, params, _set, other):
      obj = models.Task.objects.get(meteor_id=params['_id'])
      for key, val in _set['$set'].items():
        setattr(obj, key, val)
      obj.save()


class Tasks(Publication):
    queries = [
        models.Task.objects.all(),
    ]


API.register([
    Task,
    Tasks,
])
