from django.contrib import admin
from .models import DonationProfile,Payment,Buns,DonationBunQuantity
# Register your models here.

class AuthorAdmin(admin.ModelAdmin):
    search_fields = ('payment_id',)

admin.site.register(Payment, AuthorAdmin)

admin.site.register(DonationProfile)
admin.site.register(DonationBunQuantity)
admin.site.register(Buns)




