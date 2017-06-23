from rest_framework import viewsets
from rest_framework.response import Response

from .models import Chat
from .serializers import ChatSerializer


class ChatAPI(viewsets.ViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    """ Chat messages
    """
    def list(self, *args, **kwargs):
        serializer = self.queryset

        return Response(serializer.data, status=200)
