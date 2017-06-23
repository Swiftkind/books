from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .models import Chat
from .serializers import ChatSerializer


class ChatAPI(viewsets.ViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    """ Chat messages
    """
    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)

        return Response(serializer.data, status=HTTP_200_OK)


    def retrieve(self, request, chat_id=None):
        chat_message = get_object_or_404(self.queryset, id=chat_id)
        serializer = self.serializer_class(chat_message)

        return Response(serializer.data, status=HTTP_200_OK)


    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
