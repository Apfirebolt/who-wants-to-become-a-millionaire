from rest_framework import serializers
from accounts.models import CustomUser
from questions.models import Question, Quiz, QuizTaker
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': ('No account exists with these credentials, check password and email')
    }

    def validate(self, attrs):
        
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data 
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['id'] = self.user.id
        return data


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        min_length=8,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    access = serializers.SerializerMethodField()
    refresh = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'id', 'is_staff', 'password', 'access', 'refresh',)
    
    def get_refresh(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh)

    def get_access(self, user):
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token),
        return access

    def create(self, validated_data):
        user = super(CustomUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class ListQuestionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Question
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
               
    class Meta:
        model = Question
        fields = '__all__'

    def create(self, validated_data):
        question = super(QuestionSerializer, self).create(validated_data)
        question.save()
        return question

    def validate(self, attrs):
        if attrs['answer'] == '':
            raise serializers.ValidationError('Answer field cannot be blank')
        options = [attrs['option1'], attrs['option2'], attrs['option3'], attrs['option4']]
        if attrs['answer'] not in options:
            raise serializers.ValidationError('Answer must be one of the options')
        return attrs


class ListQuizSerializer(serializers.ModelSerializer):

    questions = ListQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Quiz
        fields = '__all__'

    
    def create(self, validated_data):
        quiz = super(QuizSerializer, self).create(validated_data)
        quiz.save()
        return quiz
    

class QuizTakerSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = QuizTaker
        fields = '__all__'
        read_only_fields = ('user',)

