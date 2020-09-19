# Generated by Django 3.1.1 on 2020-09-19 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tech',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='NewProject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=1000)),
                ('criterion', models.CharField(default='None', max_length=200)),
                ('professor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.professor')),
                ('project_status', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='projects.projectstatus')),
                ('tech_used', models.ManyToManyField(to='projects.Tech')),
            ],
        ),
    ]