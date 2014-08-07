# -*- mode: ruby -*-
# vi: set ft=ruby :

##
# A Berksfile required
unless File.exists? 'Berksfile'
  raise "\n\n\tUnable to find Berksfile\n\n"
end

##
# vagrant-berkshelf plugin required
unless Vagrant.has_plugin? 'vagrant-berkshelf'
  puts "\n\n\tUnable to find vagrant-omnibus plugin"
  puts "\t~$ vagrant plugin install vagrant-berkshelf --plugin-version=2.0.1"
  raise "\nInstall plugin to proceed\n"
end

##
# vagrant-ombibus plugin required
unless Vagrant.has_plugin? 'vagrant-omnibus'
  puts "\n\n\tUnable to find vagrant-omnibus plugin"
  puts "\t~$ vagrant plugin install vagrant-omnibus --plugin-version=1.4.1"
  raise "\nInstall plugin to proceed\n"
end

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = 'trusty'

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"


  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.

  # berkshelf
  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = "Berksfile"

  # chef version
  config.omnibus.chef_version = :latest


  # nfs
  if ENV['TPN_VAGRANT_NFS']
    config.vm.synced_folder '.', '/vagrant', type: 'nfs'
    config.vm.network :private_network, ip: 'xx.xx.xx.xx'
  end

  # network
  config.vm.network :forwarded_port, guest: 4000, host: 4001

  # chef
  config.vm.provision :chef_solo do |chef|

    # Add role to current environment
    chef.run_list = [
      'recipe[mongodb]',
      'recipe[nodejs]',
    ]

  end
end
