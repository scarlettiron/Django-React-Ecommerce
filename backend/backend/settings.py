from pathlib import Path
from decouple import config
import dj_database_url
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG')

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'storages',
    'ckeditor',
    'django.contrib.staticfiles',
    "corsheaders",
    'rest_framework',
    "django.contrib.postgres",
    #"djstripe",
    'users.apps.UsersConfig',
    'orders.apps.OrdersConfig',
    'products.apps.ProductsConfig',
    'transactions.apps.TransactionsConfig',
    'categoriesTags.apps.CategoriestagsConfig',
    'media.apps.MediaConfig',
    'checkout.apps.CheckoutConfig',
    'search.apps.SearchConfig',
    'staff.apps.StaffConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

#CORS_ALLOWED_ORIGINS = ['*']
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = "*"
CORS_ALLOW_CREDENTIALS=True

CSRF_TRUSTED_ORIGINS = [config('API_URL'),]

ROOT_URLCONF = 'backend.urls'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PAGINATION_CLASS':'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE':10,
    
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


AUTH_USER_MODEL = "users.CustomProfile"

EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
ANYMAIL_MAILGUN_API_KEY = config("MAIL_GUN_DOMAIN_API")
DEFAULT_FROM_EMAIL=config('MAIL_GUN_EMAIL')

#for local development
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('DB_NAME'),
        'PASSWORD':config('DB_PASSWORD'),
        'PORT':5432,
        'USER':'postgres',
        'HOST':'localhost',
    }
}  

#for production
''' DATABASE_URL = config('DATABASE_URL')
DATABASES = {
    "default": dj_database_url.config(default=DATABASE_URL, conn_max_age=100),
} '''


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


AWS_S3_ACCESS_KEY_ID = config('AWS_ACCESS_KEY')
AWS_S3_SECRET_ACCESS_KEY = config('AWS_SECRET_KEY')
AWS_S3_FILE_OVERWRITE = False
AWS_S3_REGION_NAME = 'us-east-2'
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMIAN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"

#for using ckeditor with s3 buckets
AWS_QUERYSTRING_AUTH = False

# Static and media files (CSS, JavaScript, Images)
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMIAN}/static/'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'
MEDIA_URL = '/media/'

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
ANYMAIL_MAILGUN_API_KEY = config("MAIL_GUN_DOMAIN_API")
DEFAULT_FROM_EMAIL=config('MAIL_GUN_EMAIL')