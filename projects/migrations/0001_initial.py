# Generated by Django 3.1.1 on 2020-09-08 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('portal', '0003_auto_20200908_2307'),
    ]

    operations = [
        migrations.CreateModel(
            name='Applicationstatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='portal.portalapppersoninformation')),
            ],
        ),
        migrations.CreateModel(
            name='Projectstatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='portal.portalapppersoninformation')),
                ('cgpa', models.CharField(default='0', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=1000)),
                ('tech_used', models.CharField(max_length=1000)),
                ('criterion', models.CharField(default='None', max_length=200)),
                ('professor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.professor')),
                ('project_status', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='projects.projectstatus')),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('statement_of_purpose', models.CharField(max_length=1000)),
                ('resume', models.FileField(default='default.pdf', upload_to='resume')),
                ('application_status', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='projects.applicationstatus')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project')),
                ('student', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='projects.student')),
            ],
        ),
    ]
